<?php

namespace AppBundle\RestApi\Mountain;

use AppBundle\Entity\Mountain;
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
        $mountain = $this->entityManager
            ->getRepository('AppBundle:Mountain')
            ->findOneBy(['name' => $requestData['name']]);

        if (!$mountain) {
            $mountain = new Mountain();
            $mountain->setFromArray($requestData);
            $this->entityManager->persist($mountain);
            $this->entityManager->flush();
        }

        return $mountain;
    }
}
