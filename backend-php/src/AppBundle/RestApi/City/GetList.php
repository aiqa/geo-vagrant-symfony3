<?php

namespace AppBundle\RestApi\City;

use Doctrine\ORM\EntityManagerInterface;

class GetList
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function get()
    {
        return $this
            ->entityManager->getRepository('AppBundle:City')
            ->findBy([], ['createdAt' => 'DESC']);
    }
}
