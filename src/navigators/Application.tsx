import { NavigationContainer } from '@react-navigation/native';

import { Create, Home as HomeScreen, Update, Report } from '@/screens';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PackagePlus, PenSquare, PieChart } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				options={{
					tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
				}}
				component={HomeScreen}
			/>
			<Tab.Screen
				name="Create"
				options={{
					tabBarIcon: ({ color, size }) => (
						<PackagePlus color={color} size={size} />
					),
				}}
				component={Create}
			/>
			<Tab.Screen
				name="Update"
				options={{
					tabBarIcon: ({ color, size }) => (
						<PenSquare color={color} size={size} />
					),
				}}
				component={Update}
			/>
			<Tab.Screen
				name="Report"
				options={{
					tabBarIcon: ({ color, size }) => (
						<PieChart color={color} size={size} />
					),
				}}
				component={Report}
			/>
		</Tab.Navigator>
	);
}

function ApplicationNavigator() {
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
