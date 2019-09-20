<?php

namespace AppBundle\Controller\River;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\River;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class Get extends GenericController
{
    /**
     * @Route("/api/river/{river}")
     * @Method("GET")
     */
    public function getAction(
        Request $request,
        SerializerInterface $serializer,
        River $river
    ) {
        $data = $serializer->serialize(
            $river,
            'json',
            ['groups' => ['default']]
        );

        return $this->getDebugOrJsonResponse(
            $request,
            $data
        );
    }
}
