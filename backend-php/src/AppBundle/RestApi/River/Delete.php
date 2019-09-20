<?php

namespace AppBundle\RestApi\River;

use AppBundle\Entity\River;
use Doctrine\ORM\EntityManagerInterface;

class Delete
{
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    public function delete(River $river)
    {
        $this->entityManager->remove($river);
        $this->entityManager->flush();
    }
}
