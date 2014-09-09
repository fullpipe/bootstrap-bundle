<?php

namespace Braincrafted\Bundle\BootstrapBundle\Form\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Braincrafted\Bundle\BootstrapBundle\Exception\MethodIsNotCallableException;

class BootstrapSortableCollectionTypeListener implements EventSubscriberInterface
{
    protected $order = array();
    protected $options;

    public function __construct(array $options = array())
    {
        $this->options = $options;
    }

    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SUBMIT   => 'preSubmit',
            FormEvents::POST_SUBMIT   => 'postSubmit'
        );
    }

    public function preSubmit(FormEvent $event)
    {
        $data = $event->getData();

        if (null === $data) {
            $data = array();
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess)) {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }

        foreach ($data as $key => $value) {
            $this->order[] = $key;
        }
    }

    public function postSubmit(FormEvent $event)
    {
        $setter = $this->options['position_setter'];
        $data = $event->getData();

        foreach ($this->order as $position => $imageIndex) {
            if (isset($data[$imageIndex])) {
                $entity = $data[$imageIndex];

                if (empty($entity)) {
                    continue;
                }

                if (is_string($setter)) {
                    if (is_callable(array($entity, $setter))) {
                        call_user_func(array($entity, $setter), $position);
                    } else {
                        throw MethodIsNotCallableException::methodIsNotCallable($entity, $setter);
                    }
                } else {
                    $setter($entity, $position);
                }
            }
        }
    }
}
