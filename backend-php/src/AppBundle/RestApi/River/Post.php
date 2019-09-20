<?php

namespace AppBundle\RestApi\River;

use AppBundle\Entity\River;
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
        $river = $this->entityManager
            ->getRepository('AppBundle:River')
            ->findOneBy(['name' => $requestData['name']]);

        if (!$river) {
            $river = new River();
            $river->setFromArray($requestData);
            $this->entityManager->persist($river);
            $this->entityManager->flush();
        }

        return $river;
    }
}
