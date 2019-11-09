<?php

namespace AppBundle\Controller\Mountain;

use AppBundle\Controller\GenericController;
use AppBundle\Entity\Mountain;
use AppBundle\RestApi\Mountain\Delete as RestApiDeleteService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class Delete extends GenericController
{
    /**
     * @Route("/api/mountain/{mountain}")
     * @Method("DELETE")
     */
    public function deleteAction(Mountain $mountain, RestApiDeleteService $service)
    {
        $service->delete($mountain);

        return $this->getJsonResponse(
            [],
            Response::HTTP_NO_CONTENT
        );
    }
}
