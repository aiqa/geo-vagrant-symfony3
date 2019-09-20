<?php

namespace AppBundle\Controller\City;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\City;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class Get extends GenericController
{
    /**
     * @Route("/api/city/{city}")
     * @Method("GET")
     */
    public function getAction(
        Request $request,
        SerializerInterface $serializer,
        City $city
    ) {
        $data = $serializer->serialize(
            $city,
            'json',
            ['groups' => ['default']]
        );

        return $this->getDebugOrJsonResponse(
            $request,
            $data
        );
    }
}
