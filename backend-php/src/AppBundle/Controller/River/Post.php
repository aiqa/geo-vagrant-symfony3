<?php

namespace AppBundle\Controller\River;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\RestApi\River\Post as RestApiPostService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class Post extends GenericController
{
    /**
     * @Route("/api/river")
     * @Method({"POST"})
     */
    public function postAction(Request $request, SerializerInterface $serializer, RestApiPostService $service)
    {
        $jsonRequestData = json_decode($request->getContent());

        $this->validateDataAgainstSchema(
            'river',
            $jsonRequestData,
            Response::HTTP_FORBIDDEN
        );

        $requestData = (array) $jsonRequestData;

        $river = $service->post($requestData);

        $data = $serializer->serialize(
            $river,
            'json',
            ['groups' => ['default']]
        );

        return $this->getJsonResponse(
            $data,
            Response::HTTP_CREATED
        );
    }
}
