const URL_PATTERN = /https?:\/\/\S+/g;

type TextSegment = {
	offset: number;
	value: string;
	isUrl: boolean;
};

function splitIntoSegments(text: string): TextSegment[] {
	const segments: TextSegment[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	URL_PATTERN.lastIndex = 0;
	while ((match = URL_PATTERN.exec(text)) !== null) {
		if (match.index > lastIndex) {
			segments.push({
				offset: lastIndex,
				value: text.slice(lastIndex, match.index),
				isUrl: false,
			});
		}
		segments.push({ offset: match.index, value: match[0], isUrl: true });
		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < text.length) {
		segments.push({
			offset: lastIndex,
			value: text.slice(lastIndex),
			isUrl: false,
		});
	}

	return segments;
}

interface LinkifiedTextProps {
	text: string;
	className?: string;
}

export const LinkifiedText = ({
	text,
	className,
}: Readonly<LinkifiedTextProps>) => {
	const segments = splitIntoSegments(text).map((segment) =>
		segment.isUrl ? (
			<a
				key={segment.offset}
				href={segment.value}
				rel="noreferrer"
				target="_blank"
			>
				{segment.value}
			</a>
		) : (
			<span key={segment.offset}>{segment.value}</span>
		)
	);

	return <div className={className}>{segments}</div>;
};
