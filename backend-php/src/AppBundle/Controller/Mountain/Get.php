<?php

namespace AppBundle\Controller\Mountain;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Controller\GenericController;
use AppBundle\Entity\Mountain;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class Get extends GenericController
{
    /**
     * @Route("/api/mountain/{mountain}")
     * @Method("GET")
     */
    public function getAction(
        Request $request,
        SerializerInterface $serializer,
        Mountain $mountain
    ) {
        $data = $serializer->serialize(
            $mountain,
            'json',
            ['groups' => ['default']]
        );

        return $this->getDebugOrJsonResponse(
            $request,
            $data
        );
    }
}
