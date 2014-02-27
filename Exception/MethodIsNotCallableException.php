<?php

namespace Braincrafted\Bundle\BootstrapBundle\Exception;

class MethodIsNotCallableException extends \BadMethodCallException
{
    public static function methodIsNotCallable($entity, $method)
    {
        return new static(sprintf('Method "%s::%s" is not callable', get_class($entity), $method));
    }
}
