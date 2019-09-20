<?php

namespace AppBundle\RestApi\City;

use AppBundle\Entity\City;
use Doctrine\ORM\EntityManagerInterface;

class Delete
{
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    public function delete(City $city)
    {
        $this->entityManager->remove($city);
        $this->entityManager->flush();
    }
}
