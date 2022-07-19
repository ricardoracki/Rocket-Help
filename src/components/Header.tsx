import { Heading, HStack, IconButton, StyledProps, useTheme, Pressable, Center } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';


type Props = StyledProps & {
    title: string
}

export function Header({title, ...rest}: Props) {
    const {colors} = useTheme();
    const navigation = useNavigation();

    function handleGoBack() {
      navigation.goBack();
    }

  return (
    <HStack
    w='full'
    justifyContent='space-between'
    alignItems='center'
    bg='gray.600'
    pb={2}
    pt={12}

    {...rest}
    >
        <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24}/>}
        onPress={handleGoBack}
        zIndex={1}
        />
          <Heading color="gray.100" textAlign='center' fontSize='lg' ml={-6} flex={1}>
              {title}
          </Heading>

    </HStack>
  );
}