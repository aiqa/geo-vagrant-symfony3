<?php

namespace AppBundle\Controller\River;

use AppBundle\Controller\GenericController;
use AppBundle\RestApi\River\GetList as RestApiGetListService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class GetList extends GenericController
{
    /**
     * @Route("/api/river")
     * @Method({"GET"})
     */
    public function GetList(
        Request $request,
        SerializerInterface $serializer,
        RestApiGetListService $service
    ) {
        $rivers = $service->get();

        $data = $serializer->serialize(
            $rivers,
            'json',
            ['groups' => ['default']]
        );

        return $this->getDebugOrJsonResponse(
            $request,
            $data
        );
    }
}
