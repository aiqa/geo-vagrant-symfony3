<?php

namespace AppBundle\RestApi\Mountain;

use AppBundle\Entity\Mountain;
use Doctrine\ORM\EntityManagerInterface;

class Put
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param Mountain $mountain
     * @param $requestData
     */
    public function put(Mountain $mountain, $requestData)
    {
        $mountain->setFromArray($requestData);

        $this->entityManager->flush();
    }
}
