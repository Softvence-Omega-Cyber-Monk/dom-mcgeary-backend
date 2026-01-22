import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { id, emails, displayName, photos } = profile;

        // Fallback: if displayName is missing, construct from given/family name
        const fullName =
            displayName ||
            [profile.name?.givenName, profile.name?.familyName]
                .filter(Boolean)
                .join(' ') ||
            'Google User';

        const email = emails?.[0]?.value || '';
        const avatar = photos?.[0]?.value || null;

        const user = {
            googleId: id,
            email,
            fullName,        // ✅ matches your Prisma model
            profileImage: avatar, // ✅ matches your field name
        };

        done(null, user as any);
    }
}