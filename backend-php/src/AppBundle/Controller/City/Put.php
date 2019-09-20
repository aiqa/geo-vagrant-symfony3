<?php

namespace AppBundle\Controller\City;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\City;
use AppBundle\RestApi\City\Put as RestApiPutService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class Put extends GenericController
{
    /**
     * @Route("/api/city/{city}")
     * @Method("PUT")
     */
    public function putAction(
        Request $request,
        SerializerInterface $serializer,
        City $city,
        RestApiPutService $service
    ) {
        $jsonRequestData = json_decode($request->getContent());

        $this->validateDataAgainstSchema(
            'city',
            $jsonRequestData,
            Response::HTTP_FORBIDDEN
        );

        $requestData = (array) $jsonRequestData;

        $service->put($city, $requestData);

        $data = $serializer->serialize(
            $city,
            'json',
            ['groups' => ['default']]
        );

        return $this->getJsonResponse(
            $data
        );
    }
}
