import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  datos: {
    color: 'white',
  },
  datosBold: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    color: '#AFCAF3',
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 16,
  },
  texto: {
    color: '#AFCAF3',
  },
  container: {
    backgroundColor: '#4183D1',
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  hContainer: {
    marginRight: 25,
    alignItems: 'center',
  },
  vContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datosContainer: {
    alignItems: 'center',
    marginBottom: 50, // Ajusta este valor según sea necesario
    alignContent: 'space-between',
    padding: 10,
  },
  lugar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  temperatura: {
    color: 'white',
    fontSize: 80,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 10, // Ajusta este valor según sea necesario
    marginTop: -20, // Ajusta este valor para mover hacia arriba
  },
  headerTemperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: -10, // Ajusta este valor según sea necesario
  },
  map: {
    width: '100%',
    height: 200,
    marginVertical: 20, // Ajusta este valor según sea necesario
  },
  contentContainer: {
    padding: 16,
  },
});
