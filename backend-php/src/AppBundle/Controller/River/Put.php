<?php

namespace AppBundle\Controller\River;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\River;
use AppBundle\RestApi\River\Put as RestApiPutService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class Put extends GenericController
{
    /**
     * @Route("/api/river/{river}")
     * @Method("PUT")
     */
    public function putAction(
        Request $request,
        SerializerInterface $serializer,
        River $river,
        RestApiPutService $service
    ) {
        $jsonRequestData = json_decode($request->getContent());

        $this->validateDataAgainstSchema(
            'river',
            $jsonRequestData,
            Response::HTTP_FORBIDDEN
        );

        $requestData = (array) $jsonRequestData;

        $service->put($river, $requestData);

        $data = $serializer->serialize(
            $river,
            'json',
            ['groups' => ['default']]
        );

        return $this->getJsonResponse(
            $data
        );
    }
}
