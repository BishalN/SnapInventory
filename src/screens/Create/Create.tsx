import { CreateProductInput, createProduct } from '@/services/db/crud';
import {
	Button,
	ButtonText,
	Input,
	InputField,
	Textarea,
	TextareaInput,
	VStack,
	useToast,
	View,
	Text,
	AlertCircleIcon,
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlHelper,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText,
} from '@gluestack-ui/themed';
import uuid from 'react-native-uuid';
import { useState } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateProductSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(20),
	price: z.number().min(0),
	quantity: z.number().min(0),
	barcode: z.string().min(0),
	category: z.string().min(0),
	type: z.string().min(0),
});

type CreateProductType = z.infer<typeof CreateProductSchema>;

export function Example() {
	const toast = useToast();
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
		},
	});

	const [state] = useState<CreateProductInput>({
		name: '',
		description: '',
		price: 0,
		quantity: 0,
		barcode: '',
		category: '',
		supplierId: '',
		type: 'product',
		createdAt: '',
		updatedAt: '',
		_id: '',
	});

	const handleCreateProduct = async () => {
		const res = await createProduct({
			...state,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			_id: uuid.v4() as string,
		});
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
		handleCreateProduct()
			.then(() => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<View padding="$4">
			{/* <Heading size="md">General Information</Heading>
			<Divider /> */}
			<VStack mt="$2" space="md">
				<Controller
					control={control}
					rules={{
						required: true,
					}}
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
					rules={{
						required: true,
					}}
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
					rules={{
						required: true,
					}}
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
					rules={{
						required: true,
					}}
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

				<Button
					onPress={handleSubmit(onSubmit)}
					width="$32"
					size="sm"
					variant="solid"
				>
					<ButtonText>Submit</ButtonText>
				</Button>
			</VStack>
		</View>
	);
}

export default Example;
