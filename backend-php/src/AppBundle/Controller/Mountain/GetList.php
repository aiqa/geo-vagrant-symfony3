<?php

namespace AppBundle\Controller\Mountain;

use AppBundle\Controller\GenericController;
use AppBundle\RestApi\Mountain\GetList as RestApiGetListService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class GetList extends GenericController
{
    /**
     * @Route("/api/mountain")
     * @Method({"GET"})
     */
    public function GetList(
        Request $request,
        SerializerInterface $serializer,
        RestApiGetListService $service
    ) {
        $mountains = $service->get();

        $data = $serializer->serialize(
            $mountains,
            'json',
            ['groups' => ['default']]
        );

        return $this->getDebugOrJsonResponse(
            $request,
            $data
        );
    }
}
