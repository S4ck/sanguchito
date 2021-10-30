import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/core";

function Footer() {
  return (
    <Box as="footer" w="100%" bg="bluex.500" color="white" position="relative" zIndex="1101">
      <Flex w="90%" mx="auto" justify="space-between" align="center" py="6">
        <Text>2021 Todos los Derechos Reservados</Text>

        <Stack isInline>
          <a href="https://www.facebook.com/Cevicheria-D-Ingrid-470615666611723">
            <Icon name="facebook" mx="2" />
          </a>
          <a href="https://instagram.com">
            <Icon name="instagram" mx="2" />
          </a>
          <a href="https://twitter.com">
            <Icon name="twitter" mx="2" />
          </a>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Footer;
