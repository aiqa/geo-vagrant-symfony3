<?php

namespace AppBundle\RestApi\River;

use AppBundle\Entity\River;
use Doctrine\ORM\EntityManagerInterface;

class Put
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param River $river
     * @param $requestData
     */
    public function put(River $river, $requestData)
    {
        $river->setFromArray($requestData);

        $this->entityManager->flush();
    }
}
