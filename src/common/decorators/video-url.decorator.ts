import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isURL,
} from 'class-validator';

enum VideoTypeEnum {
  none = 'none',
  youtube = 'youtube',
  vimeo = 'vimeo',
  videoCipher = 'videoCipher',
  zoom = 'zoom',
  penpencilvdo = 'penpencilvdo',
  antMedia = 'antMedia',
  jwPlayer = 'jwPlayer',
  awsVideo = 'awsVideo',
}

export function IsVideoUrl(
  relatedProperty?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsVideoUrl',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [relatedProperty],
      options: validationOptions,

      validator: {
        validate(videoUrl: any, args: ValidationArguments) {
          if (!(videoUrl && typeof videoUrl == 'string')) {
            return false;
          }
          if (!isURL(videoUrl)) {
            return false;
          }
          const [relatedPropertyName] = args.constraints;
          if (!relatedPropertyName) return true;

          //get video type
          const videoType = (args.object as any)[relatedPropertyName]?.trim();

          if (videoType == VideoTypeEnum.vimeo) {
            const vimeoRegex =
              /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
            const regexMatch = videoUrl.match(vimeoRegex);
            const videoId =
              regexMatch && regexMatch.length && regexMatch.length >= 4
                ? regexMatch[3]
                : '';
            if (!videoId) return false;
          }
          if (videoType == VideoTypeEnum.youtube) {
            const myregexp =
              /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            const regExMatch = videoUrl.match(myregexp);
            const videoId =
              regExMatch && regExMatch.length && regExMatch.length > 0
                ? regExMatch[1]
                : '';
            if (!videoId) return;
          }

          // if (videoType == VideoTypeEnum.antMedia) {
          //   return false;
          // }
          // if (videoType == VideoTypeEnum.awsVideo) {
          //   return false;
          // }
          // if (videoType == VideoTypeEnum.jwPlayer) {
          //   return false;
          // }
          // if (videoType == VideoTypeEnum.penpencilvdo) {
          //   return false;
          // }
          // if (videoType == VideoTypeEnum.videoCipher) {
          //   return false;
          // }
          // if (videoType == VideoTypeEnum.zoom) {
          //   return false;
          // }
          // if (videoType == VideoTypeEnum.none) {
          //   return false;
          // }
          //video type should be validated
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const videoType = (args.object as any)[relatedPropertyName];
          return `invalid video_url for the given video_type: ${videoType}`;
        },
      },
    });
  };
}
