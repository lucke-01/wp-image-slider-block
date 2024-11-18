/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save(props) {
	let containerTransform = ((props.attributes.images.length + 1) * 16).toString().concat("vw");
	let imgStyle = {};
	if (props.attributes.maxHeight != null) {
		imgStyle["maxHeight"] = `${props.attributes.maxHeight}${props.attributes.maxHeightUnit}`;
	}
	if (props.attributes.maxWidth != null) {
		imgStyle["maxWidth"] = `${props.attributes.maxWidth}${props.attributes.maxWidthUnit}`;
	}
	const blockProperties = useBlockProps.save();

	const numberImages = parseInt(props.attributes.images.length);
	const imageWidth = props.attributes.maxWidthUnit == "px" ? parseInt(props.attributes.maxWidth) : 150;
	const containerWidth = 600; // this should be the dinamic size of the container but we can not access here to the dom since save.js is only used to generate the html that will be displayed in the frontend. for doing so we will need to see in view.js
	let animationSeconds = (((imageWidth * numberImages) + (containerWidth/2)) / 150) + parseInt(props.attributes.speed);
	return (
			<div {...blockProperties}>
				<div 
					className={`slider-container ${props.attributes.pauseOnHover ? "pause-on-hover" : ""}`}
					style={{"--total-container-transform": `${containerTransform}`}}
				>
					<figure className={`slider-images ${props.attributes.pauseOnHover ? "pause-on-hover" : ""}`} style={{animation: `slide-${props.attributes.direction} ${animationSeconds}s linear infinite;`}}> 
						{props.attributes.images.map((image, index) => (
							<img 
								style={{...imgStyle}} 
								key={index} src={image.url} 
								data-mediaid={image.id}
								className={`${props.attributes.grayEffect ? "gray-effect" : ""}`}
								/>
						))}
						{/* image clonation to show more content */}
						{props.attributes.images.map((image, index) => (
							<img
								style={{ ...imgStyle}} 
								key={index}
								src={image.url}
								data-mediaid={image.id}
								className={`duplicate-image ${props.attributes.grayEffect ? "gray-effect" : ""}`}
							/>
						))}
					</figure>
				</div>
			</div>
	);
}