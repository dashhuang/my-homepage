import Image from "next/image";
import type { FamilyMember } from '../constants/family';
import type { Lang } from '../lib/i18n';
import { blurDataURL } from '../utils/imageBlurData';
import TiltCard from './TiltCard';
import styles from './FamilyMemberCard.module.css';

interface FamilyMemberCardProps {
  member: FamilyMember;
  lang: Lang;
  layout?: 'horizontal' | 'horizontal-reverse' | 'vertical';
}

export default function FamilyMemberCard({ member, lang, layout = 'horizontal' }: FamilyMemberCardProps) {
  const name = member.name[lang];

  if (layout === 'vertical') {
    return (
      <TiltCard className={styles.verticalTilt} maxRotation={5} glareMaxOpacity={0.15}>
        <article className={styles.vertical}>
          <div className={styles.verticalPhoto}>
            <Image
              src={member.photo}
              alt={name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
          <div className={styles.verticalContent}>
            <h3 className={styles.verticalName}>{name}</h3>
            <div className={styles.verticalDivider} />
            <p className={styles.verticalText}>{member.title[lang]}</p>
            <p className={styles.verticalText}>{member.desc[lang]}</p>
          </div>
        </article>
      </TiltCard>
    );
  }

  return (
    <TiltCard className={styles.horizontalTilt} maxRotation={3} glareMaxOpacity={0.1} scale={1.02}>
      <article className={`${styles.horizontal} ${layout === 'horizontal-reverse' ? styles.reverse : ''}`}>
        <div className={styles.horizontalPhoto}>
          <Image
            src={member.photo}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
        <div className={styles.horizontalContent}>
          <h3 className={styles.horizontalName}>{name}</h3>
          <div className={styles.horizontalDivider} />
          <p className={styles.horizontalText}>{member.desc[lang]}</p>
        </div>
      </article>
    </TiltCard>
  );
}
