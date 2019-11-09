<?php

namespace AppBundle\Controller\City;

use AppBundle\Controller\GenericController;
use AppBundle\RestApi\City\GetList as RestApiGetListService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class GetList extends GenericController
{
    /**
     * @Route("/api/city")
     * @Method({"GET"})
     */
    public function getList(
        Request $request,
        SerializerInterface $serializer,
        RestApiGetListService $service
    ) {
        $cities = $service->get();

        $data = $serializer->serialize(
            $cities,
            'json',
            ['groups' => ['default']]
        );

        return $this->getDebugOrJsonResponse(
            $request,
            $data
        );
    }
}
