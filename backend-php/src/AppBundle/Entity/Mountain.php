<?php

namespace AppBundle\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Mountain.
 */
class Mountain
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
    private $height;

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
     * @return Mountain
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
     * Set height.
     *
     * @param int $height
     *
     * @return Mountain
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get height.
     *
     * @return int
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Mountain
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
