<?php

namespace AppBundle\RestApi\Mountain;

use AppBundle\Entity\Mountain;
use Doctrine\ORM\EntityManagerInterface;

class Delete
{
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    public function delete(Mountain $mountain)
    {
        $this->entityManager->remove($mountain);
        $this->entityManager->flush();
    }
}
