/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import { MediaPlaceholder } from "@wordpress/block-editor";
import { BlockControls } from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck, BlockIcon } from "@wordpress/block-editor";
import { InspectorControls } from "@wordpress/block-editor";
import { ToggleControl, PanelBody, SelectControl, RangeControl,TextControl  } from "@wordpress/components";
export default function Edit(props) {
	const hasImages = props.attributes.images.length > 0;

	return (
		<>
		<InspectorControls>
			<PanelBody title={__("General", "scrollable-gallery")} initialOpen>
				<ToggleControl
					checked={props.attributes.pauseOnHover}
					label={__("Pause on hover", "scrollable-gallery")}
					onChange={() => 
						props.setAttributes({
							pauseOnHover: !props.attributes.pauseOnHover,
						})
					}
				/>
				<ToggleControl
					checked={props.attributes.grayEffect}
					label={__("Gray Effect", "scrollable-gallery")}
					onChange={() => 
						props.setAttributes({
							grayEffect: !props.attributes.grayEffect,
						})
					}
				/>
				<SelectControl
					value={props.attributes.direction}
					options={[
						{ value: "right", label: "Right" },
						{ value: "left", label: "Left" },
					]}
					label={__("Direction", "scrollable-gallery")}
					onChange={(newDirection) => props.setAttributes({ direction: newDirection })}
				/>
				<TextControl 
					type="number"
					label="Time for animation the more the slower"
					value={props.attributes.speed}
					onChange={(newSpeed) => props.setAttributes({ speed: parseInt(newSpeed) })}
				/>
				<TextControl 
					type="number"
					label="Max Width"
					value={props.attributes.maxWidth}
					onChange={(newMaxWidth) => props.setAttributes({ maxWidth: parseInt(newMaxWidth) })}
				/>
				<SelectControl
					value={props.attributes.maxWidthUnit}
					options={[
						{ value: "px", label: "px" },
						{ value: "vw", label: "vw" },
						{ value: "%", label: "%" },
					]}
					label="max width unit"
					onChange={(newMaxWidthUnit) => props.setAttributes({ maxWidthUnit: newMaxWidthUnit })}
				/>
				<TextControl 
					type="number"
					label="Max Height"
					value={props.attributes.maxHeight}
					onChange={(newMaxHeight) => props.setAttributes({ maxHeight: parseInt(newMaxHeight) })}
				/>
				<SelectControl
					value={props.attributes.maxHeightUnit}
					options={[
						{ value: "px", label: "px" },
						{ value: "vw", label: "vw" },
						{ value: "%", label: "%" },
					]}
					label="Max Height unit"
					onChange={(newMaxHeightUnit) => props.setAttributes({ maxHeightUnit: newMaxHeightUnit })}
				/>
			</PanelBody>
		</InspectorControls>
		<SelectControl
			value={props.attributes.direction}
			options={[
				{ value: "right", label: "Right" },
				{ value: "left", label: "Left" },
			]}
			label={__("Direction", "scrollable-gallery")}
			onChange={(newDirection) => props.setAttributes({ direction: newDirection })}
		/>
		<RangeControl
			label="Time for animation the more the slower."
			value={props.attributes.speed}
			onChange={(newSpeed) => props.setAttributes({ speed: newSpeed })}
			min={ 0 }
			max={ 100 }
		/>
		<BlockControls>
			<ToolbarGroup>
				<MediaUploadCheck>
					<MediaUpload
						multiple
						gallery
						addToGallery={true}
						onSelect={(newImages) =>
							props.setAttributes({ images: newImages })}
						allowedTypes={["image"]}
						value={props.attributes.images.map((image) => image.id)}
						render={({ open }) => (
							<ToolbarButton onClick={open}>
								{__("Edit Gallery", "scrollable-gallery")}
							</ToolbarButton>)}
					/>
				</MediaUploadCheck>
			</ToolbarGroup>
		</BlockControls>
		<div {...useBlockProps()}>
			{hasImages && (
				<figure className="scrollable-gallery-inner-container">
					{props.attributes.images.map((image, index) => (
						<img key={index} src={image.url} />
					))}
				</figure>
			)}
			{!hasImages && (
				<MediaPlaceholder
					multiple
					gallery
					icon={<BlockIcon icon="format-gallery" />}
					labels={{
						title: "Scrollable Gallery",
						instructions: "Create an awesome scrollable gallery.",
					}}
					onSelect={(newImages) => props.setAttributes({ images: newImages })}
				/>
			)}
		</div>
		</>
	);
}