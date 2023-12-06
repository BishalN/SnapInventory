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

function Example() {
	const toast = useToast();
	const [state, setState] = useState<CreateProductInput>({
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

	const handleSubmit = async () => {
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
	return (
		<View padding="$4">
			{/* <Heading size="md">General Information</Heading>
			<Divider /> */}
			<VStack mt="$2" space="md">
				<FormControl
					size="md"
					isDisabled={false}
					isInvalid={false}
					isReadOnly={false}
					isRequired={false}
				>
					<FormControlLabel mb="$1">
						<FormControlLabelText>Name</FormControlLabelText>
					</FormControlLabel>
					<Input>
						<InputField
							value={state.name}
							onChangeText={name => setState({ ...state, name })}
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
						<FormControlErrorText>
							At least 3 characters are required.
						</FormControlErrorText>
					</FormControlError>
				</FormControl>

				<FormControl
					size="md"
					isDisabled={false}
					isInvalid={false}
					isReadOnly={false}
					isRequired={false}
				>
					<FormControlLabel mb="$1">
						<FormControlLabelText>Description</FormControlLabelText>
					</FormControlLabel>
					<Textarea>
						<TextareaInput
							value={state.description}
							onChangeText={description => setState({ ...state, description })}
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
						<FormControlErrorText>
							At least 20 characters are required.
						</FormControlErrorText>
					</FormControlError>
				</FormControl>

				<FormControl
					size="md"
					isDisabled={false}
					isInvalid={false}
					isReadOnly={false}
					isRequired={false}
				>
					<FormControlLabel mb="$1">
						<FormControlLabelText>Price</FormControlLabelText>
					</FormControlLabel>
					<Input>
						<InputField
							value={state.price.toString()}
							onChangeText={price =>
								setState({ ...state, price: Number(price) })
							}
							placeholder="product price"
						/>
					</Input>
					<FormControlError>
						<FormControlErrorIcon as={AlertCircleIcon} />
						<FormControlErrorText>
							At least 3 characters are required.
						</FormControlErrorText>
					</FormControlError>
				</FormControl>

				<FormControl
					size="md"
					isDisabled={false}
					isInvalid={false}
					isReadOnly={false}
					isRequired={false}
				>
					<FormControlLabel mb="$1">
						<FormControlLabelText>Stock Quantity</FormControlLabelText>
					</FormControlLabel>
					<Input>
						<InputField
							value={state.quantity.toString()}
							onChangeText={quantity =>
								setState({ ...state, quantity: Number(quantity) })
							}
							placeholder="Stock quantity"
						/>
					</Input>

					<FormControlError>
						<FormControlErrorIcon as={AlertCircleIcon} />
						<FormControlErrorText>
							At least 3 characters are required.
						</FormControlErrorText>
					</FormControlError>
				</FormControl>

				<Button onPress={handleSubmit} width="$32" size="sm" variant="solid">
					<ButtonText>Submit</ButtonText>
				</Button>
			</VStack>
		</View>
	);
}

export default Example;
