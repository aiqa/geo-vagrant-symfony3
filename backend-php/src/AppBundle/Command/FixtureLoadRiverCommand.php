<?php

namespace AppBundle\Command;

use AppBundle\Entity\River;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Yaml\Yaml;

class FixtureLoadRiverCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('fixture:load:river')
            ->addOption(
                'directory',
                null,
                InputOption::VALUE_REQUIRED,
                'directory with river fixtures',
                '../fixtures/data/river'
            )
            ->setDescription('Load fixture files for rivers');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            '',
            'Fixture: Load River',
            '====================',
        ]);

        $finder = new Finder();
        $finder
            ->in($input->getOption('directory'))
            ->files('*.yml');

        $em = $this->getContainer()->get('doctrine.orm.entity_manager');

        foreach ($finder as $f) {
            $output->writeln('  * filename: ' . $f->getRealPath());

            $yml = Yaml::parse($f->getContents());

            foreach ($yml as $arrayData) {
                $river = new River();
                $river->setName($arrayData['name']);
                $river->setLength($arrayData['length']);
                $em->persist($river);
            }
        }
        $em->flush();
    }
}
