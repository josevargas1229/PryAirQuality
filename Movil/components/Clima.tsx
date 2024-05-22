import React, { useEffect, useState, ReactNode, useCallback } from 'react';
import { View, Text, Alert, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './Estilos';

interface ClimaProps {
  children?: ReactNode;
  backgroundColor: string;
  contentBackgroundColor: string;
  parallaxHeaderHeight: number;
  renderForeground?: () => ReactNode;
}

const Clima: React.FC<ClimaProps> = ({ children, backgroundColor, contentBackgroundColor, parallaxHeaderHeight, renderForeground }) => {
  const [data, setData] = useState<any>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch('http://api.weatherapi.com/v1/forecast.json?key=1fb72a14371346eb839225803230910&q=huejutla&days=5&aqi=no&alerts=no&lang=es')
      .then(res => res.json())
      .then(obj => {
        setData(obj);
        setLoad(true);
      })
      .catch(err => Alert.alert('Error inesperado : ' + err));
  }, []);

  const Card = useCallback(({ fecha, iko, condicion, min, max }: { fecha: string, iko: string, condicion: string, min: number, max: number }) => (
    <View style={[styles.vContainer, { justifyContent: 'space-between' }]}>
      <View style={styles.vContainer}>
        <Image style={{ height: 50, width: 50 }} source={{ uri: 'https:' + iko }} />
        <Text style={styles.datosBold}>{fecha} </Text>
        <Text style={styles.datosBold}> {condicion} </Text>
      </View>
      <View style={styles.vContainer}>
        <Text style={styles.datosBold}> {max}°C </Text>
        <Text style={styles.texto}>/</Text>
        <Text style={styles.datosBold}> {min}°C </Text>
      </View>
    </View>
  ), []);

  const CardDias = useCallback(({ temperatura, ico, vel, hora }: { temperatura: number, ico: string, vel: number, hora: string }) => {
    const date = hora;
    const fechaHora = date.split(" ");
    const hour = fechaHora[1];
    return (
      <View style={styles.hContainer}>
        <Text style={styles.datosBold}>{temperatura}°</Text>
        <Image style={{ height: 50, width: 50 }} source={{ uri: 'https:' + ico }} />
        <Text style={styles.datos}>{vel} km/h</Text>
        <Text style={styles.texto}>{hour}</Text>
      </View>
    );
  }, []);

  const Datos = useCallback(({ dato, valor }: { dato: string, valor: string }) => (
    <View style={[styles.vContainer, { justifyContent: 'space-between', borderBottomColor: '#AFCAF3', borderBottomWidth: 0.2, paddingBottom: 3 }]}>
      <Text style={styles.texto}>{dato}</Text>
      <Text style={styles.datosBold}>{valor}</Text>
    </View>
  ), []);

  const LScreen = useCallback(() => (
    <ScrollView>
      {renderForeground && <View style={{ height: parallaxHeaderHeight }}>{renderForeground()}</View>}
      <View style={styles.headerContainer}>
        <Text style={styles.lugar}>{data.location.name}</Text>
        <View style={styles.headerTemperatureContainer}>
          <Text style={styles.temperatura}>{data.current.temp_c}</Text>
          <Text style={[styles.lugar, { marginTop: 18 }]}>°C</Text>
        </View>
        <View style={styles.vContainer}>
          <Text style={styles.datosBold}>{data.current.condition.text} </Text>
          <Text style={styles.datosBold}> {data.forecast.forecastday[0].day.maxtemp_c} °C  </Text>
          <Text style={styles.texto}>/</Text>
          <Text style={styles.datosBold}> {data.forecast.forecastday[0].day.mintemp_c} °C  </Text>
        </View>
        <MapView
          style={styles.map}
          region={{
            latitude: data.location.lat,
            longitude: data.location.lon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location.lat,
              longitude: data.location.lon,
            }}
            title={data.location.name}
            description={data.location.region}
          />
        </MapView>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Pronóstico de 5 días</Text>
        <FlatList
          data={data.forecast.forecastday}
          renderItem={({ item }) => <Card fecha={item.date} iko={item.day.condition.icon} condicion={item.day.condition.text} max={item.day.maxtemp_c} min={item.day.mintemp_c} />}
          keyExtractor={(item) => item.date}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Pronóstico de 24 horas</Text>
        <FlatList
          data={data.forecast.forecastday[0].hour}
          renderItem={({ item }) => <CardDias temperatura={item.temp_c} ico={item.condition.icon} vel={item.wind_kph} hora={item.time} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.vContainer}>
        <View>
          <View style={styles.container}>
            <Text style={styles.datosBold}>{data.current.wind_dir}</Text>
            <Text style={styles.datosBold}>{data.current.wind_kph} km/h</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.vContainer}>
              <Text style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunrise}</Text>
              <Text style={styles.texto}>  Amanecer</Text>
            </View>
            <View style={styles.vContainer}>
              <Text style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunset}</Text>
              <Text style={styles.texto}>  Anochecer</Text>
            </View>
          </View>
        </View>
        <View style={[styles.container, { marginLeft: -5 }]}>
          <Datos dato={'Humedad'} valor={data.current.humidity + '%'} />
          <Datos dato={'Sensación real      '} valor={data.current.feelslike_c + '°'} />
          <Datos dato={'UV'} valor={data.current.uv} />
          <Datos dato={'Presión'} valor={data.current.pressure_mb + 'mbar'} />
          <Datos dato={'Prob. de lluvia'} valor={data.forecast.forecastday[0].day.daily_chance_of_rain + '%'} />
        </View>
      </View>
      <View style={[styles.contentContainer, { backgroundColor: contentBackgroundColor }]}>
        {children}
      </View>
    </ScrollView>
  ), [data, renderForeground]);

  const Uscreen = () => (
    <View>
      <ActivityIndicator size={'large'} color={'darkblue'} />
      <Text>Cargando datos...</Text>
    </View>
  );

  return (
    <View style={[{ backgroundColor }, styles.container]}>
      {load ? LScreen() : Uscreen()}
    </View>
  );
};

export default Clima;
