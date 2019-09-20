<?php

namespace AppBundle\RestApi\City;

use AppBundle\Entity\City;
use Doctrine\ORM\EntityManagerInterface;

class Put
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param City $city
     * @param $requestData
     */
    public function put(City $city, $requestData)
    {
        $city->setFromArray($requestData);

        $this->entityManager->flush();
    }
}
