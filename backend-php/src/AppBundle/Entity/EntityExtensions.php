<?php

namespace AppBundle\Entity;

trait EntityExtensions
{
    public function setFromArray($data)
    {
        foreach ($data as $k => $v) {
            $methodName = 'set' . ucfirst($k);
            if (method_exists($this, $methodName)) {
                $this->$methodName($v);
            }
        }
    }
}
