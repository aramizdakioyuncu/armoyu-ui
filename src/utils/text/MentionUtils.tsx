import React from 'react';
import { MentionLink } from '../../components/common/Mentions/MentionLink';
import { HashtagLink } from '../../components/common/Mentions/HashtagLink';

/**
 * Metin içindeki @kullaniciadi ve #hashtag ifadelerini bulur ve tıkalanabilir yapılara dönüştürür.
 * @param text İşlenecek ham metin
 * @returns JSX Element dizisi
 */
export const parseMentions = (text: string): React.ReactNode => {
  if (!text) return null;

  // Regex: Hem @ hem de # ile başlayan kelimeleri yakalar
  const regex = /(@\w+|#\w+)/g;
  const parts = text.split(regex);
  const matches = text.match(regex);

  let matchIndex = 0;

  return (
    <>
      {parts.map((part, i) => {
        const currentMatch = matches && i < parts.length - 1 ? matches[matchIndex++] : null;
        
        return (
          <React.Fragment key={i}>
            {part}
            {currentMatch && (
              currentMatch.startsWith('@') ? (
                <MentionLink username={currentMatch.substring(1)} />
              ) : (
                <HashtagLink tag={currentMatch.substring(1)} />
              )
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
