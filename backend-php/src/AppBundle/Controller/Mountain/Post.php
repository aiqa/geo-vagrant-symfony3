<?php

namespace AppBundle\Controller\Mountain;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\RestApi\Mountain\Post as RestApiPostService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class Post extends GenericController
{
    /**
     * @Route("/api/mountain")
     * @Method({"POST"})
     */
    public function postAction(Request $request, SerializerInterface $serializer, RestApiPostService $service)
    {
        $jsonRequestData = json_decode($request->getContent());

        $this->validateDataAgainstSchema(
            'mountain',
            $jsonRequestData,
            Response::HTTP_FORBIDDEN
        );

        $requestData = (array) $jsonRequestData;

        $mountain = $service->post($requestData);

        $data = $serializer->serialize(
            $mountain,
            'json',
            ['groups' => ['default']]
        );

        return $this->getJsonResponse(
            $data,
            Response::HTTP_CREATED
        );
    }
}
