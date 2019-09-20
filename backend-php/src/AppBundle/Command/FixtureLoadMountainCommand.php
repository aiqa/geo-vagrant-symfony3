<?php

namespace AppBundle\Command;

use AppBundle\Entity\Mountain;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Console\Input\InputOption;

class FixtureLoadMountainCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('fixture:load:mountain')
            ->addOption(
                'directory',
                null,
                InputOption::VALUE_REQUIRED,
                'directory with mountain fixtures',
                '../fixtures/data/mountain'
            )
            ->setDescription('Load fixture files for mountains');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            '',
            'Fixture: Load Mountains',
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
                $mountain = new Mountain();
                $mountain->setName($arrayData['name']);
                $mountain->setHeight($arrayData['height']);
                $em->persist($mountain);
            }
        }
        $em->flush();
    }
}
