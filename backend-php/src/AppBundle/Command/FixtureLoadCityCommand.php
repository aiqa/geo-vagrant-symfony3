<?php

namespace AppBundle\Command;

use AppBundle\Entity\City;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Yaml\Yaml;

class FixtureLoadCityCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('fixture:load:city')
            ->addOption(
                'directory',
                null,
                InputOption::VALUE_REQUIRED,
                'directory with city fixtures',
                '../fixtures/data/city'
            )
            ->setDescription('Load fixture files for cities');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            '',
            'Fixture: Load City',
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
                $city = new City();
                $city->setName($arrayData['name']);
                $city->setPopulation($arrayData['population']);
                $em->persist($city);
            }
        }
        $em->flush();
    }
}
