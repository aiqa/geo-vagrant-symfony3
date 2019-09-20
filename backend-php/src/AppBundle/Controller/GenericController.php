<?php

namespace AppBundle\Controller;

use JsonSchema\Validator as JsonValidator;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class GenericController extends Controller
{
    protected function getDebugOrJsonResponse(
        Request $request,
        $data = null,
        $status = Response::HTTP_OK,
        $encodingOptions = JSON_UNESCAPED_SLASHES
    ) {
        if ('yes' === $request->query->get('profilerView', 'no')) {
            return $this->render('default/debug.html.twig', [
                'data' => $data,
            ]);
        } else {
            return $this->getJsonResponse(
                $data,
                $status,
                $encodingOptions
            );
        }
    }

    protected function getJsonResponse(
        $data = null,
        $status = Response::HTTP_OK,
        $encodingOptions = JSON_UNESCAPED_SLASHES
    ) {
        $jsonResponse = new JsonResponse();
        $jsonResponse->setEncodingOptions($encodingOptions);
        $jsonResponse->setStatusCode($status);

        if (null === $data) {
            $data = new \ArrayObject();
            $jsonResponse->setData($data);
        } elseif (is_array($data)) {
            $jsonResponse->setData($data);
        } elseif (is_string($data)) {
            $jsonResponse->setJson($data);
        }

        return $jsonResponse;
    }

    protected function validateDataAgainstSchema(
        $jsonSchemaFilename,
        $jsonData,
        $statusCode = Response::HTTP_UNAUTHORIZED
    ) {
        $schema = json_decode(
            $this->getJsonSchemaForInputValidationFilename($jsonSchemaFilename)
        );

        $oValidator = new JsonValidator();
        $oValidator->check($jsonData, $schema);

        $errorMessages = array_map(function ($error) {
            return $error['message'];
        }, $oValidator->getErrors());
        $strErrorMessages = implode('; ', $errorMessages);

        if ($oValidator->isValid()) {
            return;
        }

        throw new HttpException($statusCode, $strErrorMessages);
    }

    protected function getJsonSchemaForInputValidationFilename($schemaName)
    {
        $filename = $this->container->getParameter('api_json_schema_request') . '/' . $schemaName . '.json';

        return file_get_contents($filename);
    }
}
