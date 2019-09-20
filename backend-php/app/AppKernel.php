<?php

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = [
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new AppBundle\AppBundle(),
            new Snc\RedisBundle\SncRedisBundle(),
            new Nelmio\CorsBundle\NelmioCorsBundle(),
        ];

        if (in_array($this->getEnvironment(), ['docker'], true)) {
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        } else {
	    if (in_array($this->getEnvironment(), ['dev', 'test'], true)) {
	        $bundles[] = new Symfony\Bundle\DebugBundle\DebugBundle();
	        $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
	        $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
	        if (in_array($this->getEnvironment(), ['dev'], true)) {
	            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
	        }
	    }
        }

        return $bundles;
    }

    public function getRootDir()
    {
        return __DIR__;
    }

    public function getCacheDir()
    {
        return '/app-var/cache/'.$this->getEnvironment();
    }

    public function getLogDir()
    {
        return '/app-var/logs';
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(function (ContainerBuilder $container) {
            $container->setParameter('container.autowiring.strict_mode', true);
            $container->setParameter('container.dumper.inline_class_loader', true);

            $container->addObjectResource($this);
        });
        $loader->load($this->getRootDir().'/config/config_'.$this->getEnvironment().'.yml');
    }
}
