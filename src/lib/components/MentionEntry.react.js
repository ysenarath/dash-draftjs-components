import React from 'react';
import PropTypes from 'prop-types';
import styles from './MentionEntry.module.css';

/**
 * Modern minimalistic Entry component that supports both image URLs and emoji avatars
 * for mention suggestions in the Draft.js editor.
 */
const MentionEntry = (props) => {
    const {
        mention,
        theme,
        searchValue,
        isFocused,
        ...parentProps
    } = props;

    // Maximum length for emoji characters (including multi-byte emojis)
    const MAX_EMOJI_LENGTH = 4;
    
    // Check if avatar is an emoji (single character, not a URL)
    const isEmoji = mention.avatar && mention.avatar.length <= MAX_EMOJI_LENGTH && !mention.avatar.startsWith('http');

    // Highlight matching text in the mention name with modern styling
    const highlightText = (text, highlight) => {
        if (!highlight || !text) {
            return text;
        }
        
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) => {
            return part.toLowerCase() === highlight.toLowerCase() ? (
                <mark key={index} className={styles.highlight}>
                    {part}
                </mark>
            ) : part;
        });
    };

    // Combine CSS classes for the entry container
    const entryClasses = `${styles.mentionEntry} ${isFocused ? styles.mentionEntryFocused : ''}`;
    
    // Combine CSS classes for avatar container
    const avatarClasses = `${styles.avatarContainer} ${!mention.avatar ? styles.avatarContainerWithoutImage : ''}`;

    return (
        <div {...parentProps} className={entryClasses}>
            <div className={`${theme.mentionSuggestionsEntryContainer} ${styles.entryContainer}`}>
                <div className={theme.mentionSuggestionsEntryContainerLeft}>
                    <div className={`${theme.mentionSuggestionsEntryAvatar} ${avatarClasses}`}>
                        {mention.avatar ? (
                            isEmoji ? (
                                <span className={styles.avatarEmoji}>
                                    {mention.avatar}
                                </span>
                            ) : (
                                <img 
                                    src={mention.avatar} 
                                    alt={mention.name}
                                    className={styles.avatarImage}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = `<span class="${styles.avatarDefault}">${mention.name.charAt(0).toUpperCase()}</span>`;
                                    }}
                                />
                            )
                        ) : (
                            <span className={styles.avatarDefault}>
                                {mention.name.charAt(0)}
                            </span>
                        )}
                    </div>
                </div>
                <div className={`${theme.mentionSuggestionsEntryContainerRight} ${styles.textContainer}`}>
                    <div className={`${theme.mentionSuggestionsEntryText} ${styles.mentionName}`}>
                        {highlightText(mention.name, searchValue)}
                    </div>
                    {mention.description && (
                        <div className={styles.mentionDescription}>
                            {mention.description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

MentionEntry.propTypes = {
    mention: PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    theme: PropTypes.object.isRequired,
    searchValue: PropTypes.string,
    isFocused: PropTypes.bool,
};

export default MentionEntry;
