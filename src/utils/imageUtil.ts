import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export interface IImageBlob {
  name: string;
  filename: string;
  data: string;
}

/**
 * 从相册选择一张图片
 * @returns uri of the image
 */
const openSingleImageLibrary = async (): Promise<string> => {
  const options = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  } as ImageLibraryOptions;

  let uri = '';
  const result = await launchImageLibrary(options);
  if (result.didCancel || !result.assets || result.assets.length === 0) {
    console.log('用户取消了图片选择, 原因: ', result.errorCode);

    return uri;
  }

  const singleUri = result.assets[0].uri;
  if (!singleUri) {
    console.warn('uri is undefined, 不应该 happen');
  } else {
    uri = singleUri;
  }

  return uri;
};

/**
 * 从相册选择多张图片
 * @param limit 最多选择几张图片
 * @returns list of image Asset
 */
const openMultipleImageLibrary = async (limit: number): Promise<Asset[]> => {
  const options = {
    selectionLimit: limit,
    mediaType: 'photo',
    includeBase64: false,
  } as ImageLibraryOptions;

  const result = await launchImageLibrary(options);
  if (result.didCancel || !result.assets || result.assets.length === 0) {
    console.log('用户取消了图片选择, 原因: ', result.errorCode);

    return [];
  }

  return result.assets;
};

export const ImageUtil = {
  openMultipleImageLibrary,
  openSingleImageLibrary,
};
