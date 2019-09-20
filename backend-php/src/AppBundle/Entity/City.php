<?php

namespace AppBundle\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

/**
 * City.
 */
class City
{
    use EntityExtensions;

    /**
     * @var int
     * @Groups({"default"})
     */
    private $id;

    /**
     * @var string
     * @Groups({"default"})
     */
    private $name;

    /**
     * @var int
     * @Groups({"default"})
     */
    private $population;

    /**
     * @var \DateTime
     * @Groups({"default"})
     */
    private $createdAt;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return City
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set population.
     *
     * @param int $population
     *
     * @return City
     */
    public function setPopulation($population)
    {
        $this->population = $population;

        return $this;
    }

    /**
     * Get population.
     *
     * @return int
     */
    public function getPopulation()
    {
        return $this->population;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return City
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function updateTimestamps()
    {
        if (null == $this->getCreatedAt()) {
            $this->setCreatedAt(new \DateTime('now'));
        }
    }
}
