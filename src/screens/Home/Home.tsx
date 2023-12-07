import { ProductDoc, getAllProducts } from '@/services/db/crud';
import {
	FlatList,
	View,
	Text,
	Box,
	Input,
	InputField,
	AlertCircleIcon,
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
} from '@gluestack-ui/themed';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ListRenderItem } from 'react-native';

export function ProductItem(product: ProductDoc) {
	return (
		<View
			borderColor="$amber400"
			borderRadius="$2xl"
			bg="$blueGray400"
			px="$4"
			my="$2"
			flex={1}
			flexDirection="row"
			alignItems="center"
		>
			<Box>
				<Text fontSize="$xl" fontWeight="$bold">
					{product.name}
				</Text>
				<Text fontSize="$lg">{product.description}</Text>
			</Box>
			<Text fontSize="$lg" fontWeight="$bold">
				${product.price}
			</Text>
		</View>
	);
}

function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: () => {
			return getAllProducts();
		},
	});

	if (isLoading) {
		return (
			<Box flex={1} justifyContent="center" alignItems="center">
				<ActivityIndicator size={'large'} />
			</Box>
		);
	}

	const renderItem: ListRenderItem<(typeof data.rows)[0]> = ({ item }) => (
		<ProductItem {...item.doc} />
	);

	if (!isLoading && data) {
		return (
			<View p="$4">
				<FormControl
					size="md"
					isDisabled={false}
					isInvalid={false}
					isReadOnly={false}
					isRequired={false}
					my="$2"
				>
					<Input>
						<InputField placeholder="Search by name, description" />
					</Input>

					<FormControlError>
						<FormControlErrorIcon as={AlertCircleIcon} />
						<FormControlErrorText>
							At least 6 characters are required.
						</FormControlErrorText>
					</FormControlError>
				</FormControl>
				<FlatList
					data={data.rows}
					renderItem={renderItem}
					keyExtractor={(item: (typeof data.rows)[0]) => item.id}
				/>
			</View>
		);
	}
}

export default Home;
