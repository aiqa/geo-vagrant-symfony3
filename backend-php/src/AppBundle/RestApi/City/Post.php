<?php

namespace AppBundle\RestApi\City;

use AppBundle\Entity\City;
use Doctrine\ORM\EntityManagerInterface;

class Post
{
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    public function post($requestData)
    {
        $city = $this->entityManager
            ->getRepository('AppBundle:City')
            ->findOneBy(['name' => $requestData['name']]);

        if (!$city) {
            $city = new City();
            $city->setFromArray($requestData);
            $this->entityManager->persist($city);
            $this->entityManager->flush();
        }

        return $city;
    }
}
