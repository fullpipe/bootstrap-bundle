<?php
/**
 * This file is part of BraincraftedBootstrapBundle.
 * (c) 2012-2013 by Florian Eckerstorfer
 */

namespace Braincrafted\Bundle\BootstrapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

use Braincrafted\Bundle\BootstrapBundle\Form\EventListener\BootstrapSortableCollectionTypeListener;

/**
 * BootstrapCollectionSortableType
 *
 * @package    BraincraftedBootstrapBundle
 * @subpackage Form
 * @author     Eugene Bravov <eugene.bravov@gmail.com>
 * @copyright  2014 Eugene Bravov
 * @license    http://opensource.org/licenses/MIT The MIT License
 * @link       http://bootstrap.braincrafted.com Bootstrap for Symfony2
 */
class BootstrapSortableCollectionType extends BootstrapCollectionType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $sortingListener = new BootstrapSortableCollectionTypeListener(
            $options
        );

        $builder->addEventSubscriber($sortingListener);
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        parent::setDefaultOptions($resolver);

        $resolver
            ->setDefaults(array(
                'position_setter' => null,
            ))
            ->setRequired(array(
                'position_setter'
            ))
            ->addAllowedTypes(array(
                'position_setter' => array('string', 'Closure')
            ));
    }

    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        return 'collection';
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'bootstrap_sortable_collection';
    }
}
