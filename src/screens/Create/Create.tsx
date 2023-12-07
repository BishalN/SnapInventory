import { CreateProductInput, createProduct } from '@/services/db/crud';
import {
	Button,
	ButtonText,
	Input,
	InputField,
	Textarea,
	TextareaInput,
	VStack,
	Text,
	useToast,
	ScrollView,
	AlertCircleIcon,
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlHelper,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText,
	View,
	Image,
	Box,
} from '@gluestack-ui/themed';
import uuid from 'react-native-uuid';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicationTabScreenProps } from '@/types/navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { StyleSheet } from 'react-native';

import { useState, useEffect } from 'react';

export const CreateProductSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(20),
	price: z.string().transform(value => Number(value)),
	quantity: z.string().transform(value => Number(value)),
	barcode: z.string().min(0),
	category: z.string().min(0),
	type: z.string().min(0),
	supplierName: z.string().min(3),
	supplierContact: z.string().min(0),
	createdAt: z.string().min(0),
	updatedAt: z.string().min(0),
	_id: z.string().min(0),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

export function Create({ navigation }: ApplicationTabScreenProps) {
	const toast = useToast();

	const [images, setImages] = useState([]);

	const [hasPermission, setHasPermission] = useState(false);
	const devices = useCameraDevices();
	const device = devices.back;

	const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
		checkInverted: true,
	});

	useEffect(() => {
		void (async () => {
			const status = await Camera.requestCameraPermission();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductType>({
		resolver: zodResolver(CreateProductSchema),
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			quantity: 0,
			barcode: '',
			category: '',
			type: 'product',
			supplierName: '',
			supplierContact: '',
			createdAt: '',
			updatedAt: '',
			_id: '',
		},
	});

	const handleCreateProduct = async (data: CreateProductType) => {
		const product: CreateProductInput = {
			name: data.name,
			description: data.description,
			price: Number(data.price),
			quantity: Number(data.quantity),
			barcode: data.barcode,
			category: data.category,
			type: 'product',
			supplier: {
				type: 'supplier',
				name: data.supplierName,
				contact: data.supplierContact,
			},
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			_id: uuid.v4() as string,
			images: images,
		};
		const res = await createProduct(product);

		toast.show({
			render: () => (
				<View>
					<Text>success: {JSON.stringify(res)}</Text>
				</View>
			),
		});
	};

	const onSubmit = (data: CreateProductType) => {
		console.log('on Submit', data);
		handleCreateProduct(data)
			.then(res => {
				console.log(res);
				navigation.navigate('Home');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleImageAttachment = async () => {
		console.log('handle image attachment');
		const result = await launchImageLibrary({
			mediaType: 'photo',
			quality: 1,
			selectionLimit: 3,
		});
		setImages(result.assets.map(asset => asset.uri));
	};

	return (
		<ScrollView padding="$4">
			<VStack space="md">
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormControl
							size="md"
							isDisabled={false}
							isInvalid={errors.name ? true : false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Name</FormControlLabelText>
							</FormControlLabel>
							<Input>
								<InputField
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder="product name"
								/>
							</Input>
							<FormControlHelper>
								<FormControlHelperText>
									Must be at least 3 characters.
								</FormControlHelperText>
							</FormControlHelper>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								{errors.name && (
									<FormControlErrorText>
										{errors.name.message}
									</FormControlErrorText>
								)}
							</FormControlError>
						</FormControl>
					)}
					name="name"
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormControl
							size="md"
							isDisabled={false}
							isInvalid={errors.description ? true : false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Description</FormControlLabelText>
							</FormControlLabel>
							<Textarea>
								<TextareaInput
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder="product descripton"
								/>
							</Textarea>
							<FormControlHelper>
								<FormControlHelperText>
									Write a short description for your product.
								</FormControlHelperText>
							</FormControlHelper>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								{errors.description && (
									<FormControlErrorText>
										{errors.description.message}
									</FormControlErrorText>
								)}
							</FormControlError>
						</FormControl>
					)}
					name="description"
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormControl
							size="md"
							isDisabled={false}
							isInvalid={errors.price ? true : false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Price</FormControlLabelText>
							</FormControlLabel>
							<Input>
								<InputField
									onBlur={onBlur}
									onChangeText={onChange}
									value={String(value)}
									placeholder="product price"
									keyboardType="numeric"
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								{errors.price && (
									<FormControlErrorText>
										{errors.price.message}
									</FormControlErrorText>
								)}
							</FormControlError>
						</FormControl>
					)}
					name="price"
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormControl
							size="md"
							isDisabled={false}
							isInvalid={errors.quantity ? true : false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Stock Quanitity</FormControlLabelText>
							</FormControlLabel>
							<Input>
								<InputField
									onBlur={onBlur}
									onChangeText={onChange}
									value={String(value)}
									placeholder="Stock quantity"
									keyboardType="numeric"
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								{errors.quantity && (
									<FormControlErrorText>
										{errors.quantity.message}
									</FormControlErrorText>
								)}
							</FormControlError>
						</FormControl>
					)}
					name="quantity"
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormControl
							size="md"
							isDisabled={false}
							isInvalid={errors.name ? true : false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Supplier Name</FormControlLabelText>
							</FormControlLabel>
							<Input>
								<InputField
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder="supplier name"
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								{errors.supplierName && (
									<FormControlErrorText>
										{errors.supplierName.message}
									</FormControlErrorText>
								)}
							</FormControlError>
						</FormControl>
					)}
					name="supplierName"
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormControl
							size="md"
							isDisabled={false}
							isInvalid={errors.name ? true : false}
							isReadOnly={false}
							isRequired={false}
						>
							<FormControlLabel mb="$1">
								<FormControlLabelText>Supplier Contact</FormControlLabelText>
							</FormControlLabel>
							<Input>
								<InputField
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder="supplier contact number"
								/>
							</Input>
							<FormControlError>
								<FormControlErrorIcon as={AlertCircleIcon} />
								{errors.supplierContact && (
									<FormControlErrorText>
										{errors.supplierContact.message}
									</FormControlErrorText>
								)}
							</FormControlError>
						</FormControl>
					)}
					name="supplierContact"
				/>

				{images.length > 0 && (
					<Box>
						{images.map(image => (
							<Image
								key={image}
								size="md"
								alt="product image"
								source={{
									uri: image,
								}}
							/>
						))}
					</Box>
				)}

				<Button
					onPress={handleImageAttachment}
					width="$32"
					size="sm"
					variant="solid"
				>
					<ButtonText>Upload Image</ButtonText>
				</Button>

				<Button
					onPress={handleImageAttachment}
					width="$32"
					size="sm"
					variant="solid"
				>
					<ButtonText>Add Barcode</ButtonText>
				</Button>

				{device != null && hasPermission && (
					<>
						<Camera
							style={StyleSheet.absoluteFill}
							device={device}
							isActive={true}
							frameProcessor={frameProcessor}
							frameProcessorFps={5}
						/>
						{barcodes.map((barcode, idx) => (
							<Text key={idx}>{barcode.displayValue}</Text>
						))}
					</>
				)}

				<Button
					onPress={handleSubmit(onSubmit)}
					width="$32"
					size="sm"
					variant="solid"
				>
					<ButtonText>Submit</ButtonText>
				</Button>
			</VStack>
		</ScrollView>
	);
}

export default Create;
