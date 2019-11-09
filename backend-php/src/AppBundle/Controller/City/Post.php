<?php

namespace AppBundle\Controller\City;

use AppBundle\Controller\GenericController;
use AppBundle\RestApi\City\Post as RestApiPostService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class Post extends GenericController
{
    /**
     * @Route("/api/city")
     * @Method({"POST"})
     */
    public function postAction(Request $request, SerializerInterface $serializer, RestApiPostService $service)
    {
        $jsonRequestData = json_decode($request->getContent());

        $this->validateDataAgainstSchema(
            'city',
            $jsonRequestData,
            Response::HTTP_FORBIDDEN
        );

        $requestData = (array) $jsonRequestData;

        $city = $service->post($requestData);

        $data = $serializer->serialize(
            $city,
            'json',
            ['groups' => ['default']]
        );

        return $this->getJsonResponse(
            $data,
            Response::HTTP_CREATED
        );
    }
}
