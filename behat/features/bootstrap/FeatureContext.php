<?php

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Gherkin\Node\PyStringNode;

use Behat\Mink\Exception\ExpectationException;
use Behat\MinkExtension\Context\MinkContext;
use Behatch\Context\RestContext;
use Symfony\Component\Yaml\Yaml;

class FeatureContext extends MinkContext implements Context
{
    private $saved = [];

    /**
     * @var string
     *
     * @TODO
     * Redundancy.
     *
     * This value should be read from behat.yml: base_url
     */
    private $apiUrl = 'http://geography.lh';

    /**
     * @var RestContext
     */
    private $restContext;
    private $jsonContext;

    private $lastRequest;

    public function __construct(array $parameters)
    {
        $this->apiUrl = $parameters['base_url'];
    }

    /** @BeforeScenario */
    public function gatherContexts(BeforeScenarioScope $oScope)
    {
        $oEnvironment = $oScope->getEnvironment();
        $this->jsonContext = $oEnvironment->getContext('Behatch\Context\JsonContext');
        $this->restContext = $oEnvironment->getContext('Behatch\Context\RestContext');
        $this->debugContext = $oEnvironment->getContext('Behatch\Context\DebugContext');
    }

    protected function setSaved($index, $value)
    {
        $this->saved[$index] = $value;
    }

    protected function getSaved($index, $subindex = null)
    {
        if (isset($this->saved[$index])) {
            if (null === $subindex) {
                return $this->saved[$index];
            } else {
                if (isset($this->saved[$index][$subindex])) {
                    return $this->saved[$index][$subindex];
                } else {
                    return 'UNDEFINED';
                }
            }
        } else {
            return 'UNDEFINED';
        }
    }

    /**
     * @When I generate a random string :name
     */
    public function iGenerateARandomString($name)
    {
        $this->setSaved(
            $name,
            strtoupper(sha1(spl_object_hash($this) . random_bytes(100)))
        );
    }

    public function getHttpieCommand(
        $method, $url, $body = null, $headers = [], $filenames = null
    ) {
        $url = $this->apiUrl . $url;

        $withFiles = '';
        if (!empty($filenames)) {
            $withFiles = '-f';
        }

        /*
         * Basic command for GET and DELETE
         */
        $resultHttpieCmd = sprintf(
            'http --verify no --verbose %s %s "%s"',
            $withFiles,
            $method,
            $url
        );

        if (in_array($method, ['POST', 'PUT']) && !empty($body)) {
            $jsonWithoutNewLines = json_encode(json_decode($body->__toString()));

            $resultHttpieCmd = sprintf(
                "echo '%s' | %s",
                $jsonWithoutNewLines,
                $resultHttpieCmd
            );
        }

        if (!empty($filenames)) {
            if (is_string($filenames)) {
                $resultHttpieCmd .= ' file[0]@/app/fixtures/' . $filenames;
            } elseif (is_array($filenames)) {
                foreach ($filenames as $k => $filename) {
                    $resultHttpieCmd .= ' file[' . $k . ']@/app/fixtures/' . $filename;
                }
            }
        }

        $httpieCmdHeaders = $this->convertHeaders($headers);

        if (!empty($httpieCmdHeaders)) {
            $resultHttpieCmd .= ' ' . $httpieCmdHeaders;
        }

        $headers['profilerView'] = 'yes';
        $webBrowserParams = $this->convertHeaders($headers, '=', '&');

        $webBrowserUrl = '';
        if (in_array($method, ['GET'])) {
            $webBrowserUrl = $url;
            if (!empty($webBrowserParams)) {
                $webBrowserUrl .=
                    $this->getQuestionMarkOrAmpersandForUrl($url) .
                    $webBrowserParams;
            }
        }

        return [
            'httpieCommand' => $resultHttpieCmd,
            'webBrowserUrl' => $webBrowserUrl,
        ];
    }

    public function convertHeaders($headers = [], $keyValueConnector = ':', $headersConnector = ' ')
    {
        if (empty($headers)) {
            return '';
        } else {
            $result = '';
            foreach ($headers as $headerKey => $headerValue) {
                $result .= $headersConnector . $headerKey . $keyValueConnector . $headerValue;
            }

            return trim($result, $headersConnector);
        }
    }

    public function getQuestionMarkOrAmpersandForUrl($url)
    {
        if (false === strpos($url, '?')) {
            return '?';
        } else {
            return '&';
        }
    }

    /**
     * @When I send a modified :method request to :url with body:
     */
    public function iSendAModifiedRequestToWithBody($method, $url, PyStringNode $bodyTemplate)
    {
        $url = $this->twigRenderStringTemplate($url, $this->saved);

        $newBody = $this->twigRenderPyStringNodeTemplate($bodyTemplate, $this->saved);

        $sHttpieCommand = $this->getHttpieCommand(
            $method,
            $url,
            $newBody
        );
        $this->publishDebugInfo('HTTPIE COMMAND', $sHttpieCommand);

        $this->lastRequest = $this->restContext->iSendARequestToWithBody($method, $url, $newBody);

        return $this->lastRequest;
    }

    /**
     * @When I send a modified :method request to :url
     */
    public function iSendAModifiedRequestTo($method, $url)
    {
        $url = $this->twigRenderStringTemplate($url, $this->saved);

        $sHttpieCommand = $this->getHttpieCommand(
            $method,
            $url
        );
        $this->publishDebugInfo('HTTPIE COMMAND', $sHttpieCommand);

        $this->lastRequest = $this->restContext->iSendARequestTo($method, $url);

        return $this->lastRequest;
    }

    /**
     * @When I send a modified :method request to :url with data:
     */
    public function iSendAModifiedRequestToWithData($method, $url, PyStringNode $bodyTemplate)
    {
        $url = $this->twigRenderStringTemplate($url, $this->saved);

        $newBody = $this->twigRenderPyStringNodeTemplate($bodyTemplate, $this->saved);

        $sHttpieCommand = $this->getHttpieCommand(
            $method,
            $url,
            $newBody
        );
        $this->publishDebugInfo('HTTPIE COMMAND', $sHttpieCommand);

        $this->lastRequest = $this->restContext->iAddHeaderEqualTo('Content-Type', 'application/json');
        $this->lastRequest = $this->restContext->iSendARequestToWithBody($method, $url, $newBody);

        return $this->lastRequest;
    }

    public function publishDebugInfo($sLabel, $info)
    {
        echo "\n****HTTPIE***********************************************************************************************\n";
        if (!empty($info['httpieCommand'])) {
            echo $this->appendAppDevFrontController($info['httpieCommand']) . "\n";
        }
        if (!empty($info['webBrowserUrl'])) {
            echo "\n****BROWSER***********************************************************************************************\n";
            echo $this->appendAppDevFrontController($info['webBrowserUrl']) . "\n";
        }
    }

    public function appendAppDevFrontController($url)
    {
        /*
         * @TODO remove hardcoded url geography.lh
         */
        if (!preg_match('/app_dev\.php/', $url)) {
            return str_replace('geography.lh/', 'geography.lh/app_dev.php/', $url);
        }
    }

    private function twigRenderPyStringNodeTemplate(PyStringNode $template, $variables)
    {
        $sBody = $this->twigRenderStringTemplate($template->__toString(), $variables);
        $aBody = explode("\n", $sBody);

        return new PyStringNode($aBody, $template->getLine());
    }

    protected function twigRenderStringTemplate($template, $variables)
    {
        $tplName = uniqid('twig_template_', true);
        $twig = new \Twig_Environment(new \Twig_Loader_Array([$tplName => $template]));
        $twig->setCache(false);
        $result = $twig->render(
            $tplName,
            $variables
        );

        return $result;
    }

    /**
     * @Then I save from the last response JSON node :node as :name
     */
    public function iSaveFromTheLastResponseJsonNodeAs($node, $name)
    {
        $response = (array) json_decode($this->lastRequest->getContent(), true);

        $this->setSaved($name, $this->getElementFromArray($node, $response));
    }

    public function getElementFromArray($keys, $array)
    {
        $aKeys = explode(',', $keys);

        $count = 1;
        $mItem = $array[$aKeys[0]];
        while ($count < count($aKeys)) {
            $mItem = $mItem[$aKeys[$count]];
            $count++;
        }

        return $mItem;
    }

    /**
     * @Then I print saved element :name
     */
    public function iPrintSavedElement($name)
    {
        var_dump($this->getSaved($name));
    }

    /**
     * @When I create data:
     */
    public function iCreateData(PyStringNode $string)
    {
        $data = Yaml::parse(implode("\n", $string->getStrings()));

        foreach ($data as $key => $value) {
            $this->createData($key, $value);
        }
    }

    public function createData($model, $items)
    {
        foreach ($items as $k => $v) {
            $this->createDataItem($model, $k, $v);
        }
    }

    public function createDataItem($model, $key, $values)
    {
        $sRequestBody = json_encode($values);
        $aRequestBodyTemplate = new PyStringNode([$sRequestBody], 0);
        $requestBodyToSend = $this->twigRenderPyStringNodeTemplate($aRequestBodyTemplate, $this->saved);

        $url = '/api/' . $model;

        $this->iSendAModifiedRequestToWithData(
            'POST',
            $url,
            $requestBodyToSend
        );

        $this->iSaveLastResponseAs($key);
        $this->assertSession()->statusCodeEquals(201);
    }

    /**
     * @When I save last response as :name
     */
    public function iSaveLastResponseAs($name)
    {
        $response = json_decode($this->lastRequest->getContent(), true);

        $this->setSaved($name, $response);
    }

    public function getSchema($sSchemaFilename)
    {
        $filename = __DIR__ . '/../../../documentation/' . $sSchemaFilename . '.json';
        $content = file_get_contents($filename);

        return $content;
    }

    /**
     * @Then the JSON should be valid according to schema :schemaFilename
     */
    public function theJsonShouldBeValidAccordingToSchema($schemaFilename)
    {
        $finalSchema = $this->getSchema($schemaFilename);

        $this->jsonContext->theJsonShouldBeValidAccordingToThisSchema(
            new PyStringNode([$finalSchema], 0)
        );
    }

    /**
     * @Then :arg1 exists and is a floating point type
     */
    public function existsAndIsAFloatingPointType($arg1)
    {
        $response = (array) json_decode($this->lastRequest->getContent(), true);

        if (key_exists($arg1, $response)) {
            $node_val = $response[$arg1];

            if (!is_float($node_val)) {
                throw new Exception($node_val . ' is not a floating point');
            }
        } else {
            throw new Exception('Feature doesnt have property ' . $arg1);
        }
    }

    /**
     * @Then the JSON node :node should be equal to templated value :value
     */
    public function theJsonNodeShouldBeEqualToTemplatedValue($node, $value)
    {
        $value = $this->twigRenderStringTemplate($value, $this->saved);

        $this->jsonContext->theJsonNodeShouldBeEqualTo($node, $value);
    }

    /**
     * @Then list element with the id :index has field :field with value :value
     */
    public function listElementOfIndexHasFieldWithValue($index, $field, $value)
    {
        $index = (int) $this->twigRenderStringTemplate($index, $this->saved);
        $value = $this->twigRenderStringTemplate($value, $this->saved);

        $json = (array) json_decode($this->lastRequest->getContent(), true);
        foreach ($json as $element) {
            if ($element['id'] === $index) {
                if ($element[$field] === $value) {
                    return true;
                }
            }
        }
        throw new ExpectationException(
            'Element should contain value: ' . $value,
            $this->getSession()
        );
    }

    /**
     * @Given i need to wait :n seconds
     */
    public function iNeedToWait($n)
    {
        sleep($n);
    }
}
