import Image from "next/image";
import { ReactNode } from "react";

import styles from "./FamilyMemberCard.module.css";

type Orientation = "horizontal" | "vertical";
type ImagePosition = "left" | "right";

interface FamilyMemberCardProps {
  name: string;
  title: string;
  description: ReactNode;
  imageSrc: string;
  orientation?: Orientation;
  imagePosition?: ImagePosition;
  className?: string;
}

export default function FamilyMemberCard({
  name,
  title,
  description,
  imageSrc,
  orientation = "vertical",
  imagePosition = "left",
  className,
}: FamilyMemberCardProps) {
  const containerClasses = [
    styles.card,
    orientation === "horizontal" ? styles.horizontal : styles.vertical,
  ];

  if (orientation === "horizontal" && imagePosition === "right") {
    containerClasses.push(styles.reverse);
  }

  if (className) {
    containerClasses.push(className);
  }

  return (
    <article className={containerClasses.join(" ")}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes={
            orientation === "horizontal"
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          }
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
        <div className={styles.accent} />
        <div className={styles.description}>{description}</div>
      </div>
    </article>
  );
}
