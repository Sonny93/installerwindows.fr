import { ExternalLinkStyled } from '~/shared/links/external_link_styled';

const URL_PATTERN = /(https?:\/\/\S+)/;

type TextSegment = {
	offset: number;
	value: string;
	isUrl: boolean;
};

/**
 * Splits text around URLs without any regex/lastIndex state: String#split with
 * a capturing group already returns the matched URLs interleaved with the
 * surrounding text, so this only has to turn that array into keyable segments.
 */
function splitIntoSegments(text: string): TextSegment[] {
	return text
		.split(URL_PATTERN)
		.reduce<TextSegment[]>((segments, value, index) => {
			if (value === '') return segments;

			const previous = segments.at(-1);
			const offset = previous ? previous.offset + previous.value.length : 0;
			return [...segments, { offset, value, isUrl: index % 2 === 1 }];
		}, []);
}

interface LinkifiedTextProps {
	text: string;
	className?: string;
}

export function LinkifiedText({
	text,
	className,
}: Readonly<LinkifiedTextProps>) {
	const segments = splitIntoSegments(text).map((segment) =>
		segment.isUrl ? (
			<ExternalLinkStyled
				key={segment.offset}
				href={segment.value}
				className="underline underline-offset-2"
			>
				{segment.value}
			</ExternalLinkStyled>
		) : (
			<span key={segment.offset}>{segment.value}</span>
		)
	);

	return <div className={className}>{segments}</div>;
}
